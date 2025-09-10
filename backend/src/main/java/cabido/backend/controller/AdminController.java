package cabido.backend.controller;

import cabido.backend.dto.AdminLoginDTO;
import cabido.backend.dto.AuthResponseDTO;
import cabido.backend.service.AdminService;
import cabido.backend.service.EmailService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private EmailService emailService;

    /**
     * Admin login endpoint
     */
    @PostMapping("/login")
    @PermitAll
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AdminLoginDTO loginDTO) {
        AuthResponseDTO response = adminService.login(loginDTO);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            // Use 401 Unauthorized for failed login attempts
            return ResponseEntity.status(401).body(response);
        }
    }

    /**
     * Simple token validation (example only)
     */
    @GetMapping("/validate")
    @PermitAll
    public ResponseEntity<String> validateToken(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && token.equals("Bearer dummy-token")) {
            return ResponseEntity.ok("Token is valid");
        }
        return ResponseEntity.status(401).body("Invalid token");
    }

    /**
     * Lightweight test endpoint to verify SMTP configuration
     */
    @PostMapping("/mail/test")
    @PermitAll
    public ResponseEntity<?> testSendMail(@RequestBody TestMailRequest req) {
        try {
            if (req == null || req.to == null || req.to.isBlank()) {
                return ResponseEntity.badRequest().body("Recipient email 'to' is required");
            }
            String name = (req.name == null || req.name.isBlank()) ? "Applicant" : req.name;
            String kind = (req.kind == null) ? "approve" : req.kind.toLowerCase();
            if ("approve".equals(kind)) {
                emailService.sendApprovalEmail(req.to, name);
            } else {
                emailService.sendDeclineEmail(req.to, name);
            }
            return ResponseEntity.ok("Test email sent: " + kind + " to " + req.to);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send test email: " + e.getMessage());
        }
    }

    public static class TestMailRequest {
        public String to;
        public String name;
        public String kind; // "approve" or "decline"
    }
}
