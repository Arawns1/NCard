package br.com.itneki.nekicard.socialmedia.domain;

import br.com.itneki.nekicard.socialmedia.dto.SaveSocialMediaDTO;
import br.com.itneki.nekicard.user.domain.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Entity(name = "tb_social_media")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class SocialMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "SOME_CD_ID")
    private UUID id;

    @Column(name = "SOME_BOOL_STATUS")
    private boolean status;

    @Column(name = "SOME_TX_NAME")
    @NotBlank(message = "O campo (nome) não pode ser nulo ou vazio")
    private String name;

    @Column(name = "SOME_TX_URL")
    @NotBlank(message = "O campo (url) não pode ser nulo ou vazio")
    private String url;

    @ManyToOne
    @JoinColumn(name = "FK_USER_SOME", insertable = false, updatable = false)
    private User user;

    @Column(name = "FK_USER_SOME")
    private UUID userId;

    public SocialMedia(SaveSocialMediaDTO dto, UUID userId){
        this.status = true;
        this.name = dto.name();
        this.url = dto.url();
        this.userId = userId;
    }

    public void excluir(){
        this.setStatus(false);
    }

}
