package com.zrik.wtbs.utils;

import java.util.Date;

public class DateUtils {
    public static long getTimeMillis(Date date) {
        return date.getTime();
    }

    public static long getTimeMillis() {
        Date date = new Date();
        return getTimeMillis(date);
    }
}
