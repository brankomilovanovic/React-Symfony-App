<?php

namespace App\Entity;

use App\Entity\Enum\RoleEnum;
use App\Entity\Enum\UserTypeEnum;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User extends BaseEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Column(type: "string")]
    #[Groups(['basic'])]
    private string $name;

    #[ORM\Column(type: "string")]
    #[Groups(["basic"])]
    private string $surname;

    #[ORM\Column(type: "string")]
    #[Groups(["basic"])]
    private string $username;

    #[ORM\Column(type: "string")]
    #[Groups(["basic"])]
    private string $email;

    #[ORM\Column(type: "string")]
    private string $password;

    #[ORM\Column(type: "integer", enumType: RoleEnum::class)]
    #[Groups(["basic"])]
    private RoleEnum $role;

    #[ORM\Column(type: "integer", enumType: UserTypeEnum::class)]
    #[Groups(["basic"])]
    private UserTypeEnum $userType;

    #[ORM\Column(type: "blob", nullable: true)]
    #[Groups(["extend"])]
    private $profileImage;

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

    public function getRole(): ?RoleEnum
    {
        return $this->role;
    }

    public function setRole(RoleEnum $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getUserType(): ?UserTypeEnum
    {
        return $this->userType;
    }

    public function setUserType(UserTypeEnum $userType): self
    {
        $this->userType = $userType;

        return $this;
    }

    public function getProfileImage()
    {
        if (is_resource($this->profileImage) && !is_string($this->profileImage)) {
            return stream_get_contents($this->profileImage);
        }
        return $this->profileImage;
    }

    public function setProfileImage(string $profileImage): self
    {
        $this->profileImage = $profileImage;

        return $this;
    }

    public function getRoles(): array
    {
        return [];
    }

    public function getUserIdentifier(): string
    {
        return $this->getUsername();
    }

    public function eraseCredentials()
    {
    }

    public function __sleep()
    {
        return array('id');
    }
}