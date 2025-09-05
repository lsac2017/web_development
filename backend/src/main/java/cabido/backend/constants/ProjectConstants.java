package cabido.backend.constants;

import java.util.Arrays;
import java.util.List;

public class ProjectConstants {
    
    public static final List<String> AVAILABLE_PROJECTS = Arrays.asList(
        "AI Data Extraction",
        "Machine Learning Enablement",
        "Genealogy",
        "Natural Language Processing",
        "AI-Enabled Customer Service",
        "Computer Vision",
        "Autonomous Driving Technology"
    );
    
    public static boolean isValidProject(String project) {
        return AVAILABLE_PROJECTS.contains(project);
    }
}
