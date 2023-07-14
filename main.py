import asyncio
import sentry_sdk




sentry_sdk.init("https://7bf8eea90c3d4f71b4ae65ae3de19130@o4505523323076608.ingest.sentry.io/4505523325763584")

async def async_function():
    try:
        # Código assíncrono que pode gerar uma exceção
        await asyncio.sleep(1)


        texto = "Olá, mundo!"
        texto.lowercase()
        print(texto)

    except Exception as e:
        # Captura a exceção e envia para o Sentry
        sentry_sdk.capture_exception(e)

asyncio.run(async_function())
