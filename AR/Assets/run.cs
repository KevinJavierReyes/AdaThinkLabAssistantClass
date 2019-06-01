using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using Vuforia;

public class run : MonoBehaviour {

    /*
     1.- aereo
     2.- perro
     3.- cerdo
     4.- venado
         */
    //private string running = "0";
    AssetBundle l;
    GameObject goCube;
   public  GameObject aereo;
    public GameObject perro;
    public GameObject cerdo;
    public GameObject venado;
    private string obj="0";
    //public GameObject a;
    //private TrackableBehaviour mTrackableBehaviour;
    void changeAssets(string url)
    {
        WWW www = new WWW(url);
        StartCoroutine(WaitForReq(www, "perro", "perro(Clone)"));

    }
    // private bool mAttached = false;
    // Use this for initialization
    void Start() {
        // string url = @"E:\ProyectosUnity\Hackaton-2019\Assets\AssetBundles\nino";
        // string url = "https://xpeaking1.s3.us-east-2.amazonaws.com/perro"; //"https://xpeaking1.s3.us-east-2.amazonaws.com/nino";

     
          ListenirRequest();

        // loadAssetBundle(url);
        // InstantiateObjectFromBundle();

      
    }
    public IEnumerator Get(string url)
    {
        using (UnityWebRequest www = UnityWebRequest.Get(url))
        {//www.chunkedTransfer = false;
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
                   // Data d = JsonUtility.FromJson<Data>(jsonResult);

                
                    Debug.Log(jsonResult);

                    string[] l = jsonResult.Split(',');

                    Debug.Log(l[0] + " .----. " + l[1] + "------" + l[2]);

                    if (l[0] == "0")
                    {
                        aereo.SetActive(false);
                        perro.SetActive(false);
                        cerdo.SetActive(false);
                        venado.SetActive(false);
                    }
                    else if (l[0]=="1")
                    {
                        aereo.SetActive(true);
                    }
                    else if (l[0] == "2")
                    {
                        perro.SetActive(true);
                    }
                    else if (l[0] == "3")
                    {
                        cerdo.SetActive(true);
                    }
                    else if (l[0] == "4")
                    {
                        venado.SetActive(true);
                    }else
                    {
                        aereo.SetActive(false);
                        perro.SetActive(false);
                        cerdo.SetActive(false);
                        venado.SetActive(false);
                    }
                }
                
            }
        }
 }

  

    private IEnumerator ListenirRequest()
    {
        Debug.Log("INiciando........");
        while (true)
        {

           

             Get("https://f984fb88.ngrok.io") ;

            Debug.Log("Probano peeeee");
            yield return new WaitForSeconds(3.5f); // wait half a second
                                                   // do things
        }
    }
    void loadAssetBundle(string bundle) {
        l = AssetBundle.LoadFromFile(bundle);
        Debug.Log(l);
    }
    void InstantiateObjectFromBundle() {
        var prefab = l.LoadAsset("nino");
        Instantiate(prefab);
    }
    

    IEnumerator WaitForReq(WWW www ,string name ,string find)
    {
        yield return www;
        AssetBundle bundle = www.assetBundle;
        if (www.error == null)
        {
          
            GameObject wheel = (GameObject)bundle.LoadAsset(name);
            //wheel.transform.parent=transform;
            wheel.transform.localScale = new Vector3(0f, 0f, 0f);
            wheel.transform.localPosition = new Vector3(0.0f, 0.0f, 0.0f);
            // wheel.transform.gameObject.SetActive(true);
            Instantiate(wheel); // **Change its position and rotation 



            GameObject goImageTarget = GameObject.Find("ImageTarget");
            GameObject goCube = GameObject.Find(find);
         
            goCube.transform.parent = goImageTarget.transform;
            goCube.transform.localScale = new Vector3(0.4f, 0.4f,0.4f);
            goCube.transform.localPosition = new Vector3(0, 0, 0);
         //   GameObject.Destroy(goCube);
            //goCube.animation.Play("backwards-run");
        }
        else
        {
            Debug.Log(www.error);
        }
    }
    // Update is called once per frame
    void Update () {
		
	}


    IEnumerator demo(string url)
    {

        using (UnityWebRequest www = UnityWebRequest.Get(url))
        {


            yield return www.SendWebRequest();
            Debug.Log("-----//////");
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
                    info[] entities =
                        JsonHelper.getJsonArray<info>(jsonResult);

                    Debug.Log(entities[0].name.ToString());

                }
                //ddlCountries.options.AddRange(entities.
            }
        }
    }

}
