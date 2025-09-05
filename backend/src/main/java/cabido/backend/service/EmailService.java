package cabido.backend.service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.email.footer-image-path}")
    private String footerImagePath;

    @Value("${app.email.embed-footer:true}")
    private boolean embedFooter;

    @Value("${app.email.simple-mode:false}")
    private boolean simpleMode;

    public void sendApprovalEmail(String to, String applicantName) {
        String subject = "Your Application Has Been Approved";
        if (simpleMode) {
            String text = buildApprovalText(applicantName);
            sendPlainTextEmail(to, subject, text);
        } else {
            String html = buildApprovalHtml(applicantName);
            sendHtmlEmail(to, subject, html);
        }
    }

    public void sendDeclineEmail(String to, String applicantName) {
        String subject = "Regarding Your Application";
        if (simpleMode) {
            String text = buildDeclineText(applicantName);
            sendPlainTextEmail(to, subject, text);
        } else {
            String html = buildDeclineHtml(applicantName);
            sendHtmlEmail(to, subject, html);
        }
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            // From name for better deliverability and clarity
            helper.setFrom(new InternetAddress(fromEmail, "Lifewood Recruitment"));
            helper.setTo(to);
            helper.setSubject(subject);
            // Provide a plain-text alternative to reduce spam likelihood
            String plainText = htmlToPlainText(htmlContent);
            helper.setText(plainText, htmlContent);
            helper.setReplyTo(fromEmail);

            // Attach footer image inline if present
            if (embedFooter && footerImagePath != null && !footerImagePath.isBlank()) {
                File file = new File(footerImagePath);
                if (file.exists()) {
                    FileSystemResource res = new FileSystemResource(file);
                    helper.addInline("footerImage", res);
                }
            }

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }

    private String emailBaseTemplate(String title, String messageBody) {
        // Inline CSS for better compatibility across email clients
        String footerImgTag = (embedFooter && footerImagePath != null && !footerImagePath.isBlank())
                ? "<img src=\"cid:footerImage\" alt=\"Footer\" style=\"max-width:100%; height:auto; display:block; margin-top:16px;\"/>"
                : "";
        return "" +
                "<div style=\"font-family:Arial,Helvetica,sans-serif;background-color:#f7f9fb;padding:24px;\">" +
                "  <div style=\"max-width:640px;margin:0 auto;background:#ffffff;border-radius:10px;border:1px solid #e5eaf0;overflow:hidden;\">" +
                "    <div style=\"padding:24px 24px 8px 24px;border-bottom:1px solid #eef2f7;\">" +
                "      <h2 style=\"margin:0;color:#046241;\">" + title + "</h2>" +
                "    </div>" +
                "    <div style=\"padding:24px;color:#243b4a;line-height:1.6;font-size:14px;\">" +
                messageBody +
                "      <p style=\"margin-top:24px;color:#506575;font-size:12px\">If you have any questions, simply reply to this email and we’ll be happy to help.</p>" +
                "      <p style=\"margin:0;color:#506575;font-size:12px\">Warm regards,<br/><strong>Recruitment Team</strong></p>" +
                footerImgTag +
                "    </div>" +
                "  </div>" +
                "  <p style=\"text-align:center;color:#90a4ae;font-size:11px;margin-top:16px\">© " + java.time.Year.now() + " Applicant System Management</p>" +
                "</div>";
    }

    private String buildApprovalHtml(String applicantName) {
        String body = "" +
                "<p>Dear " + escape(applicantName) + ",</p>" +
                "<p>Congratulations! We’re pleased to inform you that your application has been <strong>approved</strong>.</p>" +
                "<p>Our team will reach out with the next steps shortly. In the meantime, feel free to reply if you have any questions.</p>" +
                "<p style=\"margin:16px 0;padding:12px;background:#eaf6ee;border-left:4px solid #2e7d32;color:#1b5e20\">" +
                "You’ve done great—keep the momentum going! We look forward to working with you." +
                "</p>";
        return emailBaseTemplate("Application Approved", body);
    }

    private String buildDeclineHtml(String applicantName) {
        String body = "" +
                "<p>Dear " + escape(applicantName) + ",</p>" +
                "<p>Thank you sincerely for the time and effort you invested in your application. After careful consideration, we will not be moving forward at this time.</p>" +
                "<p>Please know this decision does not diminish your potential. We encourage you to stay connected and consider applying again in the future as opportunities evolve.</p>" +
                "<p style=\"margin:16px 0;padding:12px;background:#fff3f3;border-left:4px solid #c62828;color:#7f1d1d\">" +
                "We appreciate your interest and wish you every success on your journey." +
                "</p>";
        return emailBaseTemplate("Application Update", body);
    }

    private String buildApprovalText(String applicantName) {
        String name = escape(applicantName);
        return "Dear " + name + ",\n\n" +
                "Congratulations! Your application has been approved.\n" +
                "We will contact you shortly with the next steps.\n\n" +
                "Warm regards,\n" +
                "Recruitment Team";
    }

    private String buildDeclineText(String applicantName) {
        String name = escape(applicantName);
        return "Dear " + name + ",\n\n" +
                "Thank you for the time and effort you invested in your application.\n" +
                "After careful consideration, we will not be moving forward at this time.\n\n" +
                "We encourage you to stay connected and consider applying again in the future.\n\n" +
                "Warm regards,\n" +
                "Recruitment Team";
    }

    private void sendPlainTextEmail(String to, String subject, String textContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setFrom(new InternetAddress(fromEmail, "Lifewood Recruitment"));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(textContent, false);
            helper.setReplyTo(fromEmail);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send plain text email: " + e.getMessage(), e);
        }
    }

    private String escape(String input) {
        if (input == null) return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    private String htmlToPlainText(String html) {
        if (html == null) return "";
        // Basic conversion; enough for alternative text part
        return html
                .replaceAll("<br\\s*/?>", "\n")
                .replaceAll("</p>", "\n\n")
                .replaceAll("<[^>]+>", "")
                .replaceAll("&nbsp;", " ")
                .replace("&amp;", "&")
                .replace("&lt;", "<")
                .replace("&gt;", ">")
                .replace("&quot;", "\"")
                .replace("&#39;", "'")
                .trim();
    }
}
