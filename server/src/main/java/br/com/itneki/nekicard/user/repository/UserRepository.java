package br.com.itneki.nekicard.user.repository;

import br.com.itneki.nekicard.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByIdOrEmail(UUID id, String email);
    Optional<User> findByEmail(String email);
    Page<User> findAllByStatusTrue(Pageable paginacao);
}
