package com.formapp.vo;

public class ObjResultVO {
	
	int userIdx;
	int entryIdx;
	
	public int getUserIdx() {
		return userIdx;
	}
	public void setUserIdx(int userIdx) {
		this.userIdx = userIdx;
	}
	public int getEntryIdx() {
		return entryIdx;
	}
	public void setEntryIdx(int entryIdx) {
		this.entryIdx = entryIdx;
	}
	
	@Override
	public String toString() {
		return "ObjResultVO [userIdx = "+userIdx+", entryIdx = "+entryIdx+"]";
	}

}
