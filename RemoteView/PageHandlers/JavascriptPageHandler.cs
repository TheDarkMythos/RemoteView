using System;
using System.IO;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace RemoteView.PageHandlers
{
    class JavascriptPageHandler : AbstractPageHandler
    {
        // screen devices list
        private Screen[] screens = Screen.AllScreens;

        /// <summary>
        /// All client side scripting is here. Tasks include detecting clicks, mouse moves and updating screen image
        /// </summary>
        /// <param name="response"></param>
        /// <param name="uri"></param>
        /// <returns></returns>
        public override byte[] HandleRequest(HttpListenerResponse response, string[] uri)
        {
            int screen = GetRequestedScreenDevice(uri, screens);

            response.ContentType = "application/javascript";
            return Encoding.UTF8.GetBytes(File.ReadAllText("js/my.js"));

             
        }
    }
}
