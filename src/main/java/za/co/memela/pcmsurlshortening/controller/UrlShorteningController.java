package za.co.memela.pcmsurlshortening.controller;

import java.io.IOException;
import java.net.URISyntaxException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

import za.co.memela.pcmsurlshortening.common.URLValidator;
import za.co.memela.pcmsurlshortening.form.UrlForm;
import za.co.memela.pcmsurlshortening.service.URLConverterService;

@Controller
public class UrlShorteningController {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(UrlShorteningController.class);

	private final URLConverterService urlConverterService;

	public UrlShorteningController(URLConverterService urlConverterService) {
		this.urlConverterService = urlConverterService;
	}

	@RequestMapping(value = "/")
	public String showUrlShorteningPage(Model model) {

		model.addAttribute("urlform", new UrlForm());
		return "urlshortening.html";
	}

	@RequestMapping(value = "/shortenurl", method = RequestMethod.POST)
	public String shortenUrl(@ModelAttribute("urlform") UrlForm urlform,
			HttpServletRequest request, Model model) throws Exception {

		LOGGER.info("Received url to shorten: " + urlform.getLongUrl());

		String longUrl = urlform.getLongUrl();

		try {
			URLValidator.INSTANCE.validateURL(longUrl);
		} catch (Exception e) {
			LOGGER.debug("Please enter a valid URL");
		}

		String localURL = request.getRequestURL().toString();
		String shortenedUrl = urlConverterService.shortenURL(localURL,
				urlform.getLongUrl());
		LOGGER.info("Shortened url to: " + shortenedUrl);
		return "urlshorteningresult.html";

	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public RedirectView redirectUrl(@PathVariable String id,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException, URISyntaxException, Exception {
		LOGGER.debug("Received shortened url to redirect: " + id);
		String redirectUrlString = urlConverterService.getLongURLFromID(id);
		RedirectView redirectView = new RedirectView();
		redirectView.setUrl("http://" + redirectUrlString);
		return redirectView;
	}
}