package za.co.memela.pcmsurlshortening.controller;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

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
	public ModelAndView shortenUrl(@ModelAttribute("urlform") UrlForm urlform,
			Model model) throws Exception {

		LOGGER.info("Received url to shorten: " + urlform.getLongUrl());

		URI uri = new URI(urlform.getLongUrl());

		String longurl = urlform.getLongUrl();

		LOGGER.info("longUrl is : " + longurl);

		try {
			boolean isValidURL = URLValidator.INSTANCE.validateURL(longurl);

			LOGGER.info("isValidURL = " + isValidURL);

		} catch (Exception e) {
			LOGGER.debug("Please enter a valid URL");
		}

		if (URLValidator.INSTANCE.validateURL(longurl)) {
			LOGGER.info("longUrl is valid.......");

			String localURL = uri.getScheme() + "://" + uri.getHost();
			LOGGER.info("localURL is : " + localURL);
			String shortenedurl = urlConverterService.shortenURL(localURL,
					longurl);
			LOGGER.info(longurl + " : Shortened to: " + shortenedurl);

			/*
			 * UrlResultForm urlResultForm = new UrlResultForm();
			 * 
			 * urlResultForm.setLongurl(longUrl);
			 * urlResultForm.setShorturl(shortenedUrl);
			 */

			model.addAttribute("longUrl", longurl);
			model.addAttribute("shortenedUrl", shortenedurl);

			ModelAndView modelAndView = new ModelAndView("urlshorteningresult");
			modelAndView.addObject("longurl", longurl);
			modelAndView.addObject("shortenedurl", shortenedurl);

			return modelAndView;
			// return "urlshorteningresult.html";
		}

		throw new Exception("Please enter a valid URL");

		/*
		 * model.addAttribute("longUrl", longUrl);
		 * model.addAttribute("shortenedUrl", shortenedUrl);
		 * 
		 * RedirectView redirectView = new RedirectView();
		 * 
		 * redirectView.setContextRelative(true);
		 * 
		 * redirectView.setUrl("urlshorteningresult.html"); return redirectView;
		 */

	}
}