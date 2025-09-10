package cabido.backend.controller;

import cabido.backend.constants.ProjectConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/projects", "/projects"})
public class ProjectController {
    
    @GetMapping
    public ResponseEntity<List<String>> getAllProjects() {
        return ResponseEntity.ok(ProjectConstants.AVAILABLE_PROJECTS);
    }
}
