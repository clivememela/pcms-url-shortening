package za.co.memela.pcmsurlshortening.form;

public class UrlResultForm {

	private String longurl;
	private String shorturl;
	/**
	 * @return the longurl
	 */
	public String getLongurl() {
		return longurl;
	}
	/**
	 * @param longurl
	 *            the longurl to set
	 */
	public void setLongurl(String longurl) {
		this.longurl = longurl;
	}
	/**
	 * @return the shorturl
	 */
	public String getShorturl() {
		return shorturl;
	}
	/**
	 * @param shorturl
	 *            the shorturl to set
	 */
	public void setShorturl(String shorturl) {
		this.shorturl = shorturl;
	}
	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format("UrlResultForm [longurl=%s, shorturl=%s]", longurl,
				shorturl);
	}
}
