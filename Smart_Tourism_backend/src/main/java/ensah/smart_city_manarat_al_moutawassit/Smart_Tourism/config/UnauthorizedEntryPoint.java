package ensah.smart_city_manarat_al_moutawassit.Smart_Tourism.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;


@Component
public class UnauthorizedEntryPoint implements AuthenticationEntryPoint, Serializable {

    /**
	 * Generated serial version ID
	 */
	private static final long serialVersionUID = 1634823480283648704L;

	@Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }

}