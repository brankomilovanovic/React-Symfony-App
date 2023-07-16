<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User extends BaseEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Column(type: "string")]
    private ?string $name;

    #[ORM\Column(type: "string")]
    private ?string $surname;

    #[ORM\Column(type: "string")]
    private ?string $username;

    #[ORM\Column(type: "string")]
    private ?string $email;

    #[ORM\Column(type: "string")]
    private ?string $password;

    #[ORM\Column(type: "string")]
    private ?string $role;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role) : self 
    {
        $this->role = $role;

        return $this;

    }

    public function getUserIdentifier():string
    {
        return $this->getUsername();
    }

    public function getRoles(): array
    {
        return [];
    }

    public function eraseCredentials() {}

    public function __sleep()
    {
        return array('id');
    }

    public function jsonSerialize()
    {
        $data = get_object_vars($this);
        unset($data['password']);

        $data['date_created'] = self::formatDateTime($this->date_created);
        $data['date_updated'] = self::formatDateTime($this->date_updated);

        return $data;
    }
}
