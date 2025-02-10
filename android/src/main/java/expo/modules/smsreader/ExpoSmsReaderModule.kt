package expo.modules.smsreader

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

import expo.modules.interfaces.permissions.Permissions
import expo.modules.kotlin.Promise
import android.Manifest
import android.database.Cursor
import android.provider.Telephony
import expo.modules.core.interfaces.Arguments
import expo.modules.kotlin.exception.Exceptions

class ExpoSmsReaderModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSmsReader")

    AsyncFunction("requestSmsPermissionsAsync") { promise: Promise ->
      Permissions.askForPermissionsWithPermissionsManager(appContext.permissions, promise, Manifest.permission.READ_SMS)
    }

    AsyncFunction("getSmsPermissionsAsync") { promise: Promise ->
      Permissions.getPermissionsWithPermissionsManager(appContext.permissions, promise, Manifest.permission.READ_SMS)
    }

    AsyncFunction("readAllSmsAsync") { promise: Promise ->
      if (appContext.reactContext === null) {
        promise.reject(Exceptions.ReactContextLost())
      }
      val cursor: Cursor? = appContext.reactContext?.contentResolver?.query(
        Telephony.Sms.CONTENT_URI,
        arrayOf(
          Telephony.Sms.ADDRESS,
          Telephony.Sms.BODY,
          Telephony.Sms.DATE,
          Telephony.Sms.TYPE
        ),
        null,
        null,
        Telephony.Sms.DEFAULT_SORT_ORDER
      )

      val smsList = ArrayList<Map<String, Any>>();
      cursor?.use {
        while (it.moveToNext()) {
          print(it)
          val sms = mapOf(
            "address" to it.getString(0).toString(),
            "body" to it.getString(1).toString(),
            "date" to it.getLong(2).toDouble(),
            "type" to it.getInt(3).toString()
          )
          smsList.add(sms)
        }
      }

      promise.resolve(smsList)
    }
  }
}
