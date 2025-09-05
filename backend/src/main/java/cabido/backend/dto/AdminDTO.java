package cabido.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
}
