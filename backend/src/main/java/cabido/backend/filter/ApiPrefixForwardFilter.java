package cabido.backend.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

/**
 * Forwards legacy, non-prefixed API calls to the /api/* routes to tolerate
 * frontend misconfiguration (e.g., baseURL missing the /api suffix).
 *
 * Examples forwarded:
 *  - /projects        -> /api/projects
 *  - /applicants/...  -> /api/applicants/...
 *  - /admin/login     -> /api/admin/login
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiPrefixForwardFilter extends OncePerRequestFilter {

    private static final Set<String> ROOT_SEGMENTS = Set.of("projects", "applicants", "admin");

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String uri = request.getRequestURI();

        // Already correct
        if (uri.startsWith("/api/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Only forward for exact root segments we manage (avoid catching static assets)
        String normalized = uri.startsWith("/") ? uri.substring(1) : uri;
        String firstSeg = normalized.contains("/") ? normalized.substring(0, normalized.indexOf('/')) : normalized;

        if (ROOT_SEGMENTS.contains(firstSeg)) {
            String target = "/api" + uri; // keep the rest of the path as-is
            RequestDispatcher dispatcher = request.getRequestDispatcher(target);
            dispatcher.forward(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
