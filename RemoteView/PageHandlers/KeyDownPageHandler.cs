
using System;
using System.Globalization;
using System.Net;
using System.Windows.Forms;

namespace RemoteView.PageHandlers
{
    class KeyDownPageHandler : AbstractPageHandler
    {
        // screen devices list
        private Screen[] screens = Screen.AllScreens;

        /// <summary>
        /// Act upon right clicks received from client.
        /// </summary>
        /// <param name="response">server response</param>
        /// <param name="uri">tokenized URI</param>
        /// <returns></returns>
        public override byte[] HandleRequest(HttpListenerResponse response, string[] uri)
        {

            string keys = System.Web.HttpUtility.UrlDecode(uri[3]);
            NativeMethods.KeyDown(keys);
            return BuildHTML("Updating...");
        }

    }
}
