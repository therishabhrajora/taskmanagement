package com.taskmanagerment.taskmanagement.security;

import java.security.Key;
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
import io.jsonwebtoken.security.Keys;

@Component
public class JWTTokenUtil {
    private final String jwtSecret = "mysupersecretkeymysupersecretkey123456";
    private final long expireJWT = 8400000;

    Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

    public String generateToken(UserAuthentication user) {
        // List<String> authorities = roles.stream().map(role -> "ROLE" +
        // role.name()).collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(user.getUsername())
                // .claim("roles", authorities)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expireJWT))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validatetoken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;

        } catch (JwtException e) {
            return false;
        }
    }

}
