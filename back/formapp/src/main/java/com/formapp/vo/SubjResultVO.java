package com.formapp.vo;

public class SubjResultVO {
	
	int userIdx;
	int contentIdx;
	String answer;
	
	public int getUserIdx() {
		return userIdx;
	}
	public void setUserIdx(int userIdx) {
		this.userIdx = userIdx;
	}
	public int getContentIdx() {
		return contentIdx;
	}
	public void setContentIdx(int contentIdx) {
		this.contentIdx = contentIdx;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	@Override
	public String toString() {
		return "SubjResultVO [userIdx = "+userIdx+", contentIdx = "+contentIdx+", answer = "+answer+"]";
	}

}
