package com.matech.audit.pub.func;

import java.util.Arrays;
/**
* 存放提取出来的标签
* @author Liw
* @time  
*/
class TagsList 
{
   private String[] data;
   private int size = 0;

   public TagsList(int size) 
   {
       data = new String[size];
   }

   public TagsList() 
   {
       this(10);
   }

   public void add(String str) 
   {
       ensureCapacity(size + 1);
       data[size++] = str;
   }

   public String get(int index) 
   {
       if (index < size)
           return data[index];
       else
           return null;
   }

   //为了提高效率，只将其置为null
   public boolean remove(String str) 
   {
       for (int index = size - 1; index >= 0; index--) {
           if (str.equals(data[index])) {
               data[index] = null;
               return true;
           }
       }
       return false;
   }
   
   public boolean remove(int index)
   {
       if (index < data.length) {
           data[index] = null;
           return true;
       }
       return false;
   }

   public int size() 
   {
       return this.size;
   }

   //扩展容量
   public void ensureCapacity(int minSize) 
   {
       int oldCapacity = data.length;
       if (minSize > oldCapacity) {
           int newCapacity = (oldCapacity * 3 / 2 + 1) > minSize ? 
                   oldCapacity * 3 / 2 + 1 : minSize;
           data = (String[]) Arrays.copyOf(data, newCapacity);
       }
   }
}

