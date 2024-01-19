package br.com.itneki.nekicard.socialmedia.domain;

import br.com.itneki.nekicard.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity(name = "tb_social_media")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SocialMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "SOCIAL_MEDIA_CD_ID")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "USER_CD_ID")
    private User user;

    @Column(name = "SOCIAL_MEDIA_TX_NAME")
    @NotBlank(message = "O campo (nome) não pode ser nulo ou vazio")
    private String name;

    @Column(name = "SOCIAL_MEDIA_TX_URL")
    @NotBlank(message = "O campo (url) não pode ser nulo ou vazio")
    private String url;

}
