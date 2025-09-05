package cabido.backend.repository;

import cabido.backend.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    
    Optional<Applicant> findByEmail(String email);
    
    List<Applicant> findByProjectAppliedFor(String projectAppliedFor);
    
    @Query("SELECT a FROM Applicant a WHERE a.firstName LIKE %:name% OR a.lastName LIKE %:name%")
    List<Applicant> findByNameContaining(@Param("name") String name);
    
    boolean existsByEmail(String email);
}
