<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

class BaseEntity {

    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(type: "integer")]
    #[Groups(['basic'])]
    protected int $id;

    #[ORM\Column(type: "datetime")]
    #[Groups(['basic'])]
    protected \DateTime $date_created;

    #[ORM\Column(type: "datetime")]
    #[Groups(['basic'])]
    protected \DateTime $date_updated;

    #[ORM\Column(type: "boolean")]
    #[Groups(['basic'])]
    protected bool $deleted;

    public function __construct()
    {
        $this->date_created = new \DateTime();
        $this->date_updated = new \DateTime();
        $this->deleted = false;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getDateCreated() {
        return $this->date_created;
    }

    public function setDateCreated($dateCreated) {
        $this->date_created = $dateCreated;
    }

    public function getDateUpdated() {
        return $this->date_updated;
    }

    public function setDateUpdated($dateUpdated) {
        $this->date_updated = $dateUpdated;
    }

    public function getDeleted() {
        return $this->deleted;
    }

    public function setDeleted($deleted) {
        $this->deleted = $deleted;
    }
}
