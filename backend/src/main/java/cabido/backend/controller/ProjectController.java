package cabido.backend.controller;

import cabido.backend.constants.ProjectConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/projects", "/projects"})
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5173",
    "https://web-development-l5kg.vercel.app",
    "https://web-development-mi7t.onrender.com",
    "https://lifewood-pi.vercel.app"
})
public class ProjectController {
    
    @GetMapping
    public ResponseEntity<List<String>> getAllProjects() {
        return ResponseEntity.ok(ProjectConstants.AVAILABLE_PROJECTS);
    }
}
