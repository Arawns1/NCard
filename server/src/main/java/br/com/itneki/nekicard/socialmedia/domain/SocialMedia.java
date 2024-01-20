package br.com.itneki.nekicard.socialmedia.domain;

import br.com.itneki.nekicard.socialmedia.dto.SaveSocialMediaDTO;
import br.com.itneki.nekicard.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Entity(name = "tb_social_media")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"name", "userId"})
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"FK_USER_SOME", "SOME_TX_NAME"}))
public class SocialMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "SOME_CD_ID")
    private UUID id;

    @Column(name = "SOME_BOOL_STATUS")
    @Builder.Default
    private boolean status = true;

    @Column(name = "SOME_TX_NAME", nullable = false)
    @Enumerated(EnumType.STRING)
    private SocialMediaNames name;

    @Column(name = "SOME_TX_URL", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "FK_USER_SOME", insertable = false, updatable = false)
    @JsonIgnore
    private User user;

    @Column(name = "FK_USER_SOME", unique = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private UUID userId;

    public SocialMedia(SaveSocialMediaDTO dto, UUID userId){
        this.status = true;
        this.name = SocialMediaNames.valueOf(dto.name().toUpperCase());
        this.url = dto.url();
        this.userId = userId;
    }

    public void update(SaveSocialMediaDTO dto){
        this.url = dto.url();
    }

    public void excluir(){
        this.setStatus(false);
    }

}
