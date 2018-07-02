package za.co.memela.pcmsurlshortening.form;

public class UrlForm {

	private String longurl;

	/**
	 * @return the longUrl
	 */
	public String getLongUrl() {
		return longurl;
	}

	/**
	 * @param longUrl
	 *            the longUrl to set
	 */
	public void setLongUrl(String longurl) {
		this.longurl = longurl;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format("UrlForm [longurl=%s]", longurl);
	}
}
