package cabido.backend.controller;

import cabido.backend.dto.ApplicantDTO;
import cabido.backend.service.ApplicantService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/applicants")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5173",
    "https://web-development-l5kg.vercel.app",
    "https://web-development-mi7t.onrender.com",
    "https://lifewood-pi.vercel.app"
})
public class ApplicantController {
    
    @Autowired
    private ApplicantService applicantService;
    
    @GetMapping
    @PermitAll
    public ResponseEntity<List<ApplicantDTO>> getAllApplicants() {
        List<ApplicantDTO> applicants = applicantService.getAllApplicants();
        return ResponseEntity.ok(applicants);
    }
    
    @GetMapping("/{id}")
    @PermitAll
    public ResponseEntity<ApplicantDTO> getApplicantById(@PathVariable Long id) {
        Optional<ApplicantDTO> applicant = applicantService.getApplicantById(id);
        return applicant.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PermitAll
    public ResponseEntity<?> createApplicant(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam Integer age,
            @RequestParam String degree,
            @RequestParam String relevantExperience,
            @RequestParam String email,
            @RequestParam String projectAppliedFor,
            @RequestPart(name = "resume", required = false) MultipartFile resume
    ) {
        try {
            ApplicantDTO dto = new ApplicantDTO();
            dto.setFirstName(firstName);
            dto.setLastName(lastName);
            dto.setAge(age);
            dto.setDegree(degree);
            dto.setRelevantExperience(relevantExperience);
            dto.setEmail(email);
            dto.setProjectAppliedFor(projectAppliedFor);

            ApplicantDTO created = applicantService.createApplicant(dto);
            if (resume != null && !resume.isEmpty()) {
                created = applicantService.saveResume(created.getId(), resume);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplicant(@PathVariable Long id, @Valid @RequestBody ApplicantDTO applicantDTO) {
        try {
            ApplicantDTO updatedApplicant = applicantService.updateApplicant(id, applicantDTO);
            return ResponseEntity.ok(updatedApplicant);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PermitAll
    public ResponseEntity<?> uploadResume(@PathVariable Long id, @RequestPart("resume") MultipartFile resume) {
        try {
            ApplicantDTO dto = applicantService.saveResume(id, resume);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/resume")
    @PermitAll
    public ResponseEntity<Resource> getResume(
            @PathVariable Long id,
            @RequestParam(name = "download", defaultValue = "false") boolean download
    ) {
        try {
            Resource resource = applicantService.loadResumeAsResource(id);
            String contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            try {
                Path path = Path.of(resource.getFile().getAbsolutePath());
                String probed = Files.probeContentType(path);
                if (probed != null) {
                    contentType = probed;
                }
            } catch (Exception ignored) {}
            String disposition = download ? "attachment" : "inline";
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, disposition + "; filename=\"" + resource.getFilename() + "\"")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Dedicated endpoint to update only status without requiring full DTO
    @PutMapping("/{id}/status")
    @PermitAll
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest req) {
        try {
            if (req == null || req.status == null || req.status.isBlank()) {
                return ResponseEntity.badRequest().body("Status is required");
            }
            ApplicantDTO updated = applicantService.updateStatus(id, req.status);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Approve endpoint
    @PutMapping("/{id}/approve")
    @PermitAll
    public ResponseEntity<?> approveApplicant(@PathVariable Long id) {
        try {
            ApplicantDTO updated = applicantService.approveApplicant(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Decline endpoint
    @PutMapping("/{id}/decline")
    @PermitAll
    public ResponseEntity<?> declineApplicant(@PathVariable Long id) {
        try {
            ApplicantDTO updated = applicantService.declineApplicant(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    public static class StatusUpdateRequest {
        public String status;
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplicant(@PathVariable Long id) {
        try {
            applicantService.deleteApplicant(id);
            return ResponseEntity.ok().body("Applicant deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/project/{project}")
    public ResponseEntity<List<ApplicantDTO>> getApplicantsByProject(@PathVariable String project) {
        List<ApplicantDTO> applicants = applicantService.getApplicantsByProject(project);
        return ResponseEntity.ok(applicants);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ApplicantDTO>> searchApplicantsByName(@RequestParam String name) {
        List<ApplicantDTO> applicants = applicantService.searchApplicantsByName(name);
        return ResponseEntity.ok(applicants);
    }
}
