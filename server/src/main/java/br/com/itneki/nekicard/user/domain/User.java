package br.com.itneki.nekicard.user.domain;

import br.com.itneki.nekicard.card.domain.Card;
import br.com.itneki.nekicard.socialmedia.domain.SocialMedia;
import br.com.itneki.nekicard.user.dto.UpdateUserDTO;
import br.com.itneki.nekicard.user_photo.domain.UserPhoto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "tb_user")
@Data
@EqualsAndHashCode(of = "id")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "USER_CD_ID")
    private UUID id;

    @Column(name = "USER_BOOL_STATUS")
    @Builder.Default
    private boolean status = true;

    @Column(name = "USER_TX_NAME", nullable = false)
    private String name;

    @Column(name = "USER_TX_EMAIL", unique = true, nullable = false)
    private String email;

    @Column(name = "USER_TX_PASSWORD", nullable = false, length = 200)
    private String password;

    @Column(name = "USER_DT_BIRTHDATE", nullable = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate birthdate;

    @Column(name = "USER_TX_LOCALITY", nullable = true)
    private String locality;

    @Column(name = "USER_TX_DESCRIPTION", nullable = true, length = 120)
    private String description;

    @Column(name = "USER_TX_WORKTIME", nullable = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate workTime;

    @Column(name = "USER_TX_WORKFUNCTION", nullable = true)
    private String workFunction;

    @Column(name = "USER_TX_SOCIALNAME", nullable = true)
    private String socialName;

    @Column(name = "USER_TX_PHONE", nullable = true)
    private String phone;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SocialMedia> socialMediaList;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @PrimaryKeyJoinColumn
    @JsonIgnore
    private UserPhoto userPhoto;

    @Column(name = "USER_TX_PROFILE_PHOTO_URL", nullable = true)
    private String profilePhotoUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cardList;

    @Column(name = "USER_TX_ROLE")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public User updateInfos(UpdateUserDTO dto){
        this.socialName = dto.socialName();
        this.locality = dto.locality();
        this.description = dto.description();
        this.phone = dto.phone();
        this.workTime = dto.worktime();
        this.workFunction = dto.workFunction();
        return this;
    }

    public void excluir(){
        this.status = false;
        if (cardList != null) {
            for (Card card : cardList) {
                card.setStatus(false);
            }
        }
        if (socialMediaList != null) {
            for (SocialMedia socialMedia : socialMediaList) {
                socialMedia.excluir();
            }
        }
    }

}
