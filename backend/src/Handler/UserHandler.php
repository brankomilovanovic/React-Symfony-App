<?php

namespace App\Handler;

use App\Entity\Enum\RoleEnum;
use App\Entity\Enum\UserTypeEnum;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserHandler extends BaseHandler
{
    public function __construct(UserRepository $repository, SerializerInterface $serializer,
                                UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $em)
    {
        parent::__construct($repository, $serializer, $passwordEncoder, $em);
    }

    public function create(Request $request)
    {
        try {
            $params = json_decode($request->getContent(), true);

            if (!isset($params['email']) || !isset($params['name']) || !isset($params['surname']) ||
                !isset($params['password']) || !isset($params['username'])) {
                return $this->parameterMissingResponse();
            }

            if ($this->repository->getByUsername($params['username'])) {
                return $this->responseWithMessage('User with that username already exists!', 400);
            }

            if ($this->repository->getByEmail($params['email'])) {
                return $this->responseWithMessage('User with that email already exists!', 400);
            }

            $user = new User();
            $user->setName(ucfirst(strtolower($params['name'])));
            $user->setSurname(ucfirst(strtolower($params['surname'])));
            $user->setUsername($params['username']);
            $user->setEmail($params['email']);
            $user->setRole(isset($params['role']) ? RoleEnum::from($params['role']) : RoleEnum::ROLE_USER);
            $user->setUserType(isset($params['userType']) ? UserTypeEnum::from($params['userType']) : UserTypeEnum::INDIVIDUAL);
            $user->setPassword(
                $this->passwordEncoder->hashPassword(
                    $user, $params['password']
                )
            );

            return $this->response($this->repository->save($user), true);
        }
        catch(\Exception $e){
          return $this->responseWithMessage($e->getMessage(), 400);
        }
    }

    public function update(Request $request, int $id, User $user)
    {
        try {
            $params = json_decode($request->getContent(), true);

            $entity = $this->repository->get($id);

            if (!empty($entity)) {

                if ($user->getId() !== $id && $user->getRole() !== RoleEnum::ROLE_ADMIN) {
                    return $this->responseWithMessage("Dont have permission to update another user", 401);
                }

                if (isset($params['name'])) {
                    $entity->setName(ucfirst(strtolower($params['name'])));

                }

                if (isset($params['surname'])) {
                    $entity->setSurname(ucfirst(strtolower($params['surname'])));
                }

                if (isset($params['username']) && $entity->getUsername() !== $params['username']) {
                    if ($this->repository->getByUsername($params['username'])) {
                        return $this->responseWithMessage('User with that username already exists!', 400);
                    }
                    $entity->setUsername($params['username']);
                }

                if (isset($params['email']) && $entity->getEmail() !== $params['email']) {
                    if ($this->repository->getByEmail($params['email'])) {
                        return $this->responseWithMessage('User with that email already exists!', 400);
                    }
                    $entity->setEmail($params['email']);
                }

                if (isset($params['password'])) {
                    $entity->setPassword(
                        $this->passwordEncoder->hashPassword(
                            $entity, $params['password']
                        )
                    );
                }

                if (isset($params['role'])) {
                    $entity->setRole(RoleEnum::from($params['role']));
                }

                if (isset($params['userType'])) {
                    $entity->setUserType(UserTypeEnum::from($params['userType']));
                }

                if (isset($params['profileImage'])) {
                    $entity->setProfileImage($params['profileImage']);
                }

                $entity->setDateUpdated(new \DateTime());

                return $this->response($this->repository->save($entity, true), true);
            }
            return $this->responseWithMessage('Not exist entity under that ID!', 404);
        }
        catch(\Exception $e){
            return $this->responseWithMessage($e->getMessage(), 400);
        }
    }
}
