package com.android.android;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class IntentModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public IntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IntentModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void startActivity(String name, String params) {
        try{
            Activity activity = getCurrentActivity();
            if(null != activity){
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(activity, toActivity);
                intent.putExtra("params", params);
                activity.startActivity(intent);
            }
        } catch(Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "can not be opened Activity : "+e.getMessage());
        }
    }

}
