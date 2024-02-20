<?php
trait serializeObjectTrait
{
    public function __serialize()
    {
        $members = get_object_vars($this);
        return $members;
    }

     public function __unserialize($data)
    {
        foreach($data as $property=>$value)
        {
            $this->{$property} = $value;
        }
    }

    /*
    function serialize()
    {
        $members = get_object_vars($this);
        return serialize($members);
    }

    function unserialize($serialized)
    {
        $unserial = unserialize($serialized);

        if(is_array($unserial))
        {
            foreach($unserial as $property=>$value)
            {
                $this->{$property} = $value;
            }
        }
    }
    */
}
?>
