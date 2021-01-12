package com.formapp.vo;

import java.util.Date;

public class FormVO {
	
	int formIdx;
	String userId;
	String title;
	Date createdAt;
	
	public int getFormIdx() {
		return formIdx;
	}

	public void setFormIdx(int formIdx) {
		this.formIdx = formIdx;
	}
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	@Override
	public String toString() {
		return "FormVO [formIdx = "+formIdx+", userId = "+userId+", title = "+title+", createdAt = "+createdAt+"]";
	}

}
