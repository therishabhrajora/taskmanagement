package com.taskmanagerment.taskmanagement.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.taskmanagerment.taskmanagement.entity.UserAuthentication;
import com.taskmanagerment.taskmanagement.enums.Role;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JWTTokenUtil {
    private final String jwtSecret = "JWTTOKEN";
    private final long expireJWT = 8400000;

    public String generateToken(UserAuthentication user) {
        // List<String> authorities = roles.stream().map(role -> "ROLE" + role.name()).collect(Collectors.toList());
        return Jwts.builder()
                .setSubject(user.getUsername())
               // .claim("roles", authorities)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expireJWT))
                .signWith(SignatureAlgorithm.ES512, jwtSecret)
                .compact();

    }


    public String extractUsername(String token){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validatetoken(String token){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;

        } catch (JwtException e) {
            return false;
        }
    }

    // public String generateToken(UserAuthentication user) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'generateToken'");
    // }
}
