package cabido.backend.config;

import cabido.backend.entity.Admin;
import cabido.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin if not exists ~ Lowed Scott Cabido
        if (!adminRepository.existsByEmail("admin@lifewood.com")) {
            Admin admin = new Admin();
            admin.setEmail("admin@lifewood.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("Lloyd Scott");
            admin.setLastName("Cabido");
            adminRepository.save(admin);
            System.out.println("Default admin created: admin@lifewood.com / admin123");
        }
    }
}
