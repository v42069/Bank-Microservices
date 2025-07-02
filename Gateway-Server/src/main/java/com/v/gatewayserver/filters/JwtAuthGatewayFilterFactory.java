//package com.v.gatewayserver.filters;
//
//
//
//import java.nio.charset.StandardCharsets;
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import javax.crypto.SecretKey;
//
//import org.apache.http.HttpHeaders;
//import org.springframework.cloud.gateway.filter.GatewayFilter;
//import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//
//import com.v.gatewayserver.config.AppAuthProperties;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//@Component
//public class JwtAuthGatewayFilterFactory extends AbstractGatewayFilterFactory<JwtAuthGatewayFilterFactory.Config> {
//
//    private final AppAuthProperties keycloakProperties;
//
//    public JwtAuthGatewayFilterFactory(AppAuthProperties keycloakProperties) {
//        super(Config.class);
//        this.keycloakProperties = keycloakProperties;
//    }
//
//    @Override
//    public GatewayFilter apply(Config config) {
//        return (exchange, chain) -> {
//            String secret = keycloakProperties.getClientSecret();
//
//            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                String token = authHeader.substring(7);
//                try {
//                    SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//                    Claims claims = Jwts.parserBuilder()
//                            .setSigningKey(key)
//                            .build()
//                            .parseClaimsJws(token)
//                            .getBody();
//
//                    System.out.println("✅ JWT validated");
//                    System.out.println("Subject   : " + claims.getSubject());
//                    System.out.println("Issuer    : " + claims.getIssuer());
//                    System.out.println("Audience  : " + claims.getAudience());
//                    System.out.println("Expires At: " + claims.getExpiration());
//
//                    // ✅ Extract and check scope (can be string or list)
//                    Object scopeClaim = claims.get("scope");
//                    List<String> scopes;
//                    if (scopeClaim instanceof String) {
//                        scopes = Arrays.asList(((String) scopeClaim).split(" "));
//                    } else if (scopeClaim instanceof Collection) {
//                        scopes = ((Collection<?>) scopeClaim).stream()
//                                .map(Object::toString)
//                                .collect(Collectors.toList());
//                    } else {
//                        scopes = Collections.emptyList();
//                    }
//
//                    // ✅ Check required scope
//                    if (!scopes.contains("account:admin") && !scopes.contains("SCOPE_account:admin")) {
//                        System.out.println("❌ Scope 'account:admin' not present.");
//                        exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
//                        return exchange.getResponse().setComplete();
//                    }
//
//                    return chain.filter(exchange);
//                } catch (Exception e) {
//                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//                    return exchange.getResponse().setComplete();
//                }
//            }
//
//            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
//            return exchange.getResponse().setComplete();
//        };
//    }
//
//    public static class Config {
//        // empty if not needed
//    }
//}
