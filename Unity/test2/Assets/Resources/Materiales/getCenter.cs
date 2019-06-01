using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class getCenter : MonoBehaviour {

    public Transform target;
    Camera cam;

    void Start()
    {
        cam = GetComponent<Camera>();
    }

    void Update()
    {
        Vuforia.CameraDevice.CameraDirection y =  Vuforia.CameraDevice.Instance.GetCameraDirection();
        Debug.Log("Update Frame X : " + y.ToString());
        Vector2 x =  Vuforia.CameraDevice.Instance.GetCameraFieldOfViewRads();
        Debug.Log("Update Frame X : " + x.x + " ; Y : " + x.y);

        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            Debug.Log("vdklnnvdvskjgskjshl");
            if (Physics.Raycast(ray, out hit))
            {

                Debug.Log("246767645425364758657463524536474");
                //Select Stage
                if (hit.transform.name == "Cube")
                {
                    Application.OpenURL("https://www.google.com");
                }
            }
        }
    }

}
