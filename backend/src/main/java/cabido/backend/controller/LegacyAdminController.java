package cabido.backend.controller;

import cabido.backend.dto.AdminLoginDTO;
import cabido.backend.dto.AuthResponseDTO;
import cabido.backend.service.AdminService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Backward-compatible controller to support clients calling /admin/* (without the /api prefix).
 * Delegates to the same service logic used by AdminController.
 */
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173",
        "https://web-development-l5kg.vercel.app",
        "https://web-development-mi7t.onrender.com",
        "https://lifewood-pi.vercel.app"
})
public class LegacyAdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    @PermitAll
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AdminLoginDTO loginDTO) {
        AuthResponseDTO response = adminService.login(loginDTO);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/validate")
    @PermitAll
    public ResponseEntity<String> validateToken(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && token.equals("Bearer dummy-token")) {
            return ResponseEntity.ok("Token is valid");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }
}
