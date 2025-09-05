package cabido.backend.service;

import cabido.backend.dto.AdminDTO;
import cabido.backend.dto.AdminLoginDTO;
import cabido.backend.dto.AuthResponseDTO;
import cabido.backend.entity.Admin;
import cabido.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public AuthResponseDTO login(AdminLoginDTO loginDTO) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(loginDTO.getEmail());
        
        if (adminOptional.isEmpty()) {
            return new AuthResponseDTO("Invalid email or password", false, null, null);
        }
        
        Admin admin = adminOptional.get();
        
        if (!passwordEncoder.matches(loginDTO.getPassword(), admin.getPassword())) {
            return new AuthResponseDTO("Invalid email or password", false, null, null);
        }
        
        AdminDTO adminDTO = convertToDTO(admin);
        return new AuthResponseDTO("Login successful", true, "dummy-token", adminDTO);
    }
    
    public AdminDTO createAdmin(String email, String password, String firstName, String lastName) {
        if (adminRepository.existsByEmail(email)) {
            throw new RuntimeException("Admin with this email already exists");
        }
        
        Admin admin = new Admin();
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setFirstName(firstName);
        admin.setLastName(lastName);
        
        Admin savedAdmin = adminRepository.save(admin);
        return convertToDTO(savedAdmin);
    }
    
    public Optional<AdminDTO> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email)
                .map(this::convertToDTO);
    }
    
    private AdminDTO convertToDTO(Admin admin) {
        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setEmail(admin.getEmail());
        dto.setFirstName(admin.getFirstName());
        dto.setLastName(admin.getLastName());
        return dto;
    }
}
