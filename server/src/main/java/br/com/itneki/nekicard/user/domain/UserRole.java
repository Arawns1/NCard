package br.com.itneki.nekicard.user.domain;

public enum UserRole {
   ADMIN("admin"),
   USER("user");
   private String role;
   UserRole(String role) {
       this.role = role;
   }
}
