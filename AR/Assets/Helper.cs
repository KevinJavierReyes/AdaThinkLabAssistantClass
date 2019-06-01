using System.Collections;
using System.Collections.Generic;
using UnityEngine;

class JsonHelper
{
    public static T[] getJsonArray<T>(string json)
    {
        string newJson = "{ \"array\": " + json + "}";
        Wrapper<T> wrapper = JsonUtility.FromJson<Wrapper<T>>(newJson);
        return wrapper.array;
    }

    [System.Serializable]
    private class Wrapper<T>
    {
        public T[] array;
    }
}


[System.Serializable]
public class info
{
    public string name;
    public string url;
    public string tipo;
}
