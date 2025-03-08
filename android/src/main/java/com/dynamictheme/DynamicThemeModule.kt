package com.dynamictheme

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.material3.ColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.ui.graphics.Color
import com.dynamictheme.utils.toWritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = DynamicThemeModule.NAME)
class DynamicThemeModule(reactContext: ReactApplicationContext) :
  NativeDynamicThemeSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @RequiresApi(Build.VERSION_CODES.S)
  override fun getDynamicColorScheme(): WritableMap {
    val context = reactApplicationContext

    return Arguments.createMap().apply {
      putMap("dark", dynamicDarkColorScheme(context).toWritableMap())
      putMap("light", dynamicLightColorScheme(context).toWritableMap())
    }
  }

  companion object {
    const val NAME = "DynamicTheme"
  }
}


