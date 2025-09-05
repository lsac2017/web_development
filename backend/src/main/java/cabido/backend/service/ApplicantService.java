package cabido.backend.service;

import cabido.backend.constants.ProjectConstants;
import cabido.backend.dto.ApplicantDTO;
import cabido.backend.entity.Applicant;
import cabido.backend.repository.ApplicantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicantService {
    
    @Autowired
    private ApplicantRepository applicantRepository;

    @Autowired
    private EmailService emailService;

    private final Path resumeStorageDir = Paths.get("uploads", "resumes").toAbsolutePath().normalize();
    
    public List<ApplicantDTO> getAllApplicants() {
        return applicantRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ApplicantDTO> getApplicantById(Long id) {
        return applicantRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public ApplicantDTO createApplicant(ApplicantDTO applicantDTO) {
        if (applicantRepository.existsByEmail(applicantDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        if (!ProjectConstants.isValidProject(applicantDTO.getProjectAppliedFor())) {
            throw new RuntimeException("Invalid project selection");
        }
        
        Applicant applicant = convertToEntity(applicantDTO);
        Applicant savedApplicant = applicantRepository.save(applicant);
        return convertToDTO(savedApplicant);
    }
    
    public ApplicantDTO updateApplicant(Long id, ApplicantDTO applicantDTO) {
        Optional<Applicant> existingApplicant = applicantRepository.findById(id);
        if (existingApplicant.isEmpty()) {
            throw new RuntimeException("Applicant not found");
        }
        
        // Check if email is being changed and if new email already exists
        if (!existingApplicant.get().getEmail().equals(applicantDTO.getEmail()) 
            && applicantRepository.existsByEmail(applicantDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        if (!ProjectConstants.isValidProject(applicantDTO.getProjectAppliedFor())) {
            throw new RuntimeException("Invalid project selection");
        }
        
        Applicant applicant = convertToEntity(applicantDTO);
        applicant.setId(id);
        Applicant updatedApplicant = applicantRepository.save(applicant);
        return convertToDTO(updatedApplicant);
    }

    public ApplicantDTO saveResume(Long id, MultipartFile resume) {
        try {
            Optional<Applicant> existingApplicant = applicantRepository.findById(id);
            if (existingApplicant.isEmpty()) {
                throw new RuntimeException("Applicant not found");
            }

            Files.createDirectories(resumeStorageDir);

            String originalFileName = resume.getOriginalFilename();
            String safeFileName = (originalFileName == null || originalFileName.isBlank()) ? ("resume-" + id + ".pdf") : originalFileName.replaceAll("[^a-zA-Z0-9._-]", "_");
            String storedFileName = id + "_" + safeFileName;
            Path target = resumeStorageDir.resolve(storedFileName);
            Files.copy(resume.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            Applicant applicant = existingApplicant.get();
            applicant.setResumeFileName(safeFileName);
            applicant.setResumeContentType(resume.getContentType());
            applicant.setResumePath(target.toString());
            Applicant saved = applicantRepository.save(applicant);
            return convertToDTO(saved);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to store resume: " + ex.getMessage(), ex);
        }
    }

    public Resource loadResumeAsResource(Long id) {
        try {
            Optional<Applicant> existingApplicant = applicantRepository.findById(id);
            if (existingApplicant.isEmpty()) {
                throw new RuntimeException("Applicant not found");
            }
            Applicant applicant = existingApplicant.get();
            if (applicant.getResumePath() == null) {
                throw new RuntimeException("Resume not uploaded for this applicant");
            }
            Path filePath = Paths.get(applicant.getResumePath());
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("Resume file not found on server");
            }
        } catch (Exception ex) {
            throw new RuntimeException("Failed to load resume: " + ex.getMessage(), ex);
        }
    }
    
    public void deleteApplicant(Long id) {
        if (!applicantRepository.existsById(id)) {
            throw new RuntimeException("Applicant not found");
        }
        applicantRepository.deleteById(id);
    }
    
    public List<ApplicantDTO> getApplicantsByProject(String project) {
        return applicantRepository.findByProjectAppliedFor(project).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ApplicantDTO> searchApplicantsByName(String name) {
        return applicantRepository.findByNameContaining(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private ApplicantDTO convertToDTO(Applicant applicant) {
        ApplicantDTO dto = new ApplicantDTO();
        dto.setId(applicant.getId());
        dto.setFirstName(applicant.getFirstName());
        dto.setLastName(applicant.getLastName());
        dto.setAge(applicant.getAge());
        dto.setDegree(applicant.getDegree());
        dto.setRelevantExperience(applicant.getRelevantExperience());
        dto.setEmail(applicant.getEmail());
        dto.setProjectAppliedFor(applicant.getProjectAppliedFor());
        dto.setStatus(applicant.getStatus());
        dto.setCreatedAt(applicant.getCreatedAt());
        return dto;
    }
    
    private Applicant convertToEntity(ApplicantDTO dto) {
        Applicant applicant = new Applicant();
        applicant.setFirstName(dto.getFirstName());
        applicant.setLastName(dto.getLastName());
        applicant.setAge(dto.getAge());
        applicant.setDegree(dto.getDegree());
        applicant.setRelevantExperience(dto.getRelevantExperience());
        applicant.setEmail(dto.getEmail());
        applicant.setProjectAppliedFor(dto.getProjectAppliedFor());
        if (dto.getStatus() != null && !dto.getStatus().isBlank()) {
            applicant.setStatus(dto.getStatus());
        }
        return applicant;
    }

    public ApplicantDTO updateStatus(Long id, String status) {
        Optional<Applicant> existingApplicant = applicantRepository.findById(id);
        if (existingApplicant.isEmpty()) {
            throw new RuntimeException("Applicant not found");
        }
        Applicant a = existingApplicant.get();
        a.setStatus(status);
        Applicant saved = applicantRepository.save(a);
        // Trigger email notifications if status is approved or rejected
        try {
            String fullName = (a.getFirstName() != null ? a.getFirstName() : "") +
                    (a.getLastName() != null ? (" " + a.getLastName()) : "");
            if ("approved".equalsIgnoreCase(status)) {
                emailService.sendApprovalEmail(a.getEmail(), fullName.trim());
            } else if ("rejected".equalsIgnoreCase(status) || "declined".equalsIgnoreCase(status)) {
                emailService.sendDeclineEmail(a.getEmail(), fullName.trim());
            }
        } catch (Exception e) {
            // Log and continue; we don't want to break the flow if email fails
            System.err.println("Failed to send status email: " + e.getMessage());
        }
        return convertToDTO(saved);
    }

    public ApplicantDTO approveApplicant(Long id) {
        Optional<Applicant> existingApplicant = applicantRepository.findById(id);
        if (existingApplicant.isEmpty()) {
            throw new RuntimeException("Applicant not found");
        }
        Applicant a = existingApplicant.get();
        a.setStatus("approved");
        Applicant saved = applicantRepository.save(a);
        String fullName = (a.getFirstName() != null ? a.getFirstName() : "") +
                (a.getLastName() != null ? (" " + a.getLastName()) : "");
        try {
            emailService.sendApprovalEmail(a.getEmail(), fullName.trim());
        } catch (Exception e) {
            // Do not fail the approval operation if email sending fails
            System.err.println("Failed to send approval email: " + e.getMessage());
        }
        return convertToDTO(saved);
    }

    public ApplicantDTO declineApplicant(Long id) {
        Optional<Applicant> existingApplicant = applicantRepository.findById(id);
        if (existingApplicant.isEmpty()) {
            throw new RuntimeException("Applicant not found");
        }
        Applicant a = existingApplicant.get();
        a.setStatus("rejected");
        Applicant saved = applicantRepository.save(a);
        String fullName = (a.getFirstName() != null ? a.getFirstName() : "") +
                (a.getLastName() != null ? (" " + a.getLastName()) : "");
        try {
            emailService.sendDeclineEmail(a.getEmail(), fullName.trim());
        } catch (Exception e) {
            // Do not fail the decline operation if email sending fails
            System.err.println("Failed to send decline email: " + e.getMessage());
        }
        return convertToDTO(saved);
    }
}
