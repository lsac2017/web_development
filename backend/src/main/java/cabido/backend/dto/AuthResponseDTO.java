package cabido.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    
    private String message;
    private boolean success;
    private String token;
    private AdminDTO admin;
}
