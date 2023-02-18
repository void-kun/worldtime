package com.zrik.wtbs.controllers;

import com.zrik.wtbs.dto.ReqTimeZone;
import com.zrik.wtbs.dto.ResponseTemplate;
import com.zrik.wtbs.services.TimezoneService;
import com.zrik.wtbs.services.impl.TimeZoneServiceImpl;
import com.zrik.wtbs.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = Constant.PathTZ)
public class TimezoneController {

    @Autowired
    private TimeZoneServiceImpl timezoneService;

    @GetMapping()
    @ResponseBody
    public ResponseTemplate getTimezoneByCondition(@RequestBody ReqTimeZone reqTimeZone) {
        return timezoneService.findTimeZoneByPlaceOrTimezoneOrOffset(reqTimeZone);
    }
}
