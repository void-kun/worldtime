package com.zrik.wtbs.services;

import com.zrik.wtbs.dto.ReqTimeZone;
import com.zrik.wtbs.dto.ResponseTemplate;
import org.springframework.http.ResponseEntity;


public interface TimeZService {
    public ResponseEntity<ResponseTemplate> findTimeZoneByPlaceOrTimezoneOrOffset(ReqTimeZone reqTimeZone);
}
