package com.formapp.vo;

public class ContentVO {
	
	int contentIdx;
	int formIdx;
	String question;
	String description;
	
	public int getContentIdx() {
		return contentIdx;
	}
	public void setContentIdx(int contentIdx) {
		this.contentIdx = contentIdx;
	}
	public int getFormIdx() {
		return formIdx;
	}
	public void setFormIdx(int formIdx) {
		this.formIdx = formIdx;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public String toString() {
		return "ContentVO [contentIdx = "+contentIdx+", formIdx = "+formIdx+", question = "+question+", description = "+description+"]";
	}

}
