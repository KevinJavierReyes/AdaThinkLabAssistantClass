using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;


    public class RestClient : MonoBehaviour
    {
        private static RestClient _instance;
        public static RestClient Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = FindObjectOfType<RestClient>();
                    if (_instance == null)
                    {

                    }
                }
                
                return _instance;

            }
        }
      public IEnumerator Get(string url)
        {

       

            using (UnityWebRequest www = UnityWebRequest.Get(url))
            {


                //www.chunkedTransfer = false;
                yield return www.SendWebRequest();

                if (www.isNetworkError || www.isHttpError)
                {
                    Debug.Log(www.error);
                }
                else
                {
                    if (www.isDone)
                    {
                        string jsonResult =
                            System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);
                        Debug.Log(jsonResult);
                        //info[] entities =
                        // JsonHelper.getJsonArray<info>(jsonResult);

                        //  Debug.Log(entities[0].name.ToString());

                    }
                    //ddlCountries.options.AddRange(entities.
                }
            }

        }

    }

    

