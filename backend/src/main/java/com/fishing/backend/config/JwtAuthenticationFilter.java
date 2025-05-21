package com.fishing.backend.config;

import com.fishing.backend.service.JwtService;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@CrossOrigin(origins = "https://ja9q.github.io/fish/", allowCredentials = "true")
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final HandlerExceptionResolver handlerExceptionResolver;
  
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  
  public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService, HandlerExceptionResolver handlerExceptionResolver) {
      this.jwtService = jwtService;
      this.userDetailsService = userDetailsService;
      this.handlerExceptionResolver = handlerExceptionResolver;
  }
  
  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
    
    Cookie[] cookies = request.getCookies();
    String jwt = null;
    
    if (cookies != null && cookies.length > 0) {
      for (Cookie c : cookies) {
        if (c.getName().equals("jwt") ) {
          jwt = c.getValue();
        }
      }
    } else {
      System.out.println("from jwtauthenticationfilter: cookies is 0/null");
    }
    
    
    if (jwt == null) {
      filterChain.doFilter(request, response);
      return;
    }
    
    try {
      final String userEmail = jwtService.extractUsername(jwt);
      
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      
      if (userEmail != null && authentication == null) {
        UserDetails userDetails= this.userDetailsService.loadUserByUsername(userEmail);
        
        if (jwtService.isTokenValid(jwt, userDetails)) {
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
          
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      }
      
      filterChain.doFilter(request, response); 
      
    } catch (Exception e) {
      handlerExceptionResolver.resolveException(request, response, e, e);
    }
  }
}