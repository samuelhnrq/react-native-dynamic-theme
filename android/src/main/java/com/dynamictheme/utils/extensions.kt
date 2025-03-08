package com.dynamictheme.utils

import androidx.compose.material3.ColorScheme
import androidx.compose.ui.graphics.Color
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

// Extension function to convert compose color to hex color
fun Color.toHex(): String {
  return String.format("#%02X%02X%02X", (red * 255).toInt(), (green * 255).toInt(), (blue * 255).toInt())
}

// Extension function to convert ColorScheme to WritableMap
 fun ColorScheme.toWritableMap(): WritableMap {
  return Arguments.createMap().apply {
    putString("primary", primary.toHex())
    putString("onPrimary", onPrimary.toHex())
    putString("primaryContainer", primaryContainer.toHex())
    putString("onPrimaryContainer", onPrimaryContainer.toHex())
    putString("inversePrimary", inversePrimary.toHex())
    putString("secondary", secondary.toHex())
    putString("onSecondary", onSecondary.toHex())
    putString("secondaryContainer", secondaryContainer.toHex())
    putString("onSecondaryContainer", onSecondaryContainer.toHex())
    putString("tertiary", tertiary.toHex())
    putString("onTertiary", onTertiary.toHex())
    putString("tertiaryContainer", tertiaryContainer.toHex())
    putString("onTertiaryContainer", onTertiaryContainer.toHex())
    putString("background", background.toHex())
    putString("onBackground", onBackground.toHex())
    putString("surface", surface.toHex())
    putString("onSurface", onSurface.toHex())
    putString("surfaceVariant", surfaceVariant.toHex())
    putString("onSurfaceVariant", onSurfaceVariant.toHex())
    putString("inverseSurface", inverseSurface.toHex())
    putString("inverseOnSurface", inverseOnSurface.toHex())
    putString("outline", outline.toHex())
    putString("outlineVariant", outlineVariant.toHex())
    putString("surfaceBright", surfaceBright.toHex())
    putString("surfaceDim", surfaceDim.toHex())
    putString("surfaceContainer", surfaceContainer.toHex())
    putString("surfaceContainerHigh", surfaceContainerHigh.toHex())
    putString("surfaceContainerHighest", surfaceContainerHighest.toHex())
    putString("surfaceContainerLow", surfaceContainerLow.toHex())
    putString("surfaceContainerLowest", surfaceContainerLowest.toHex())
    putString("surfaceTint", surfaceTint.toHex())
  }
}
