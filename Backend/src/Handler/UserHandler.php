<?php

namespace App\Handler;

use App\Entity\User;
use App\Repository\UserRepository;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserHandler extends BaseHandler
{
    protected $repository;
    private $passwordEncoder;

    public function __construct(UserRepository $repository, UserPasswordHasherInterface $passwordEncoder)
    {
        $this->repository = $repository;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function create(Request $request)
    {
        $params = json_decode($request->getContent(), true);

        if (!isset($params['email']) || !isset($params['firstName']) || !isset($params['lastName']) ||
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
        $user->setName(ucfirst(strtolower($params['firstName'])));
        $user->setSurname(ucfirst(strtolower($params['lastName'])));
        $user->setUsername($params['username']);
        $user->setEmail($params['email']);
        $user->setRole('ROLE_USER');
        $user->setPassword(
            $this->passwordEncoder->hashPassword(
                $user, $params['password']
            )
        );

        return $this->response($this->repository->save($user));
    }

    public function update(Request $request, User $user)
    {
        $params = json_decode($request->getContent(), true);

//        $entity = $this->repository->get($id);

//
//        if(!empty($entity)) {
//
//            if($params['name']) {
//                $entity->setName(ucfirst(strtolower($params('name'))));
//            }
//
//            if($params['name']) {
//                $entity->setSurname(ucfirst(strtolower($params('surname'))));
//            }
//
//            if($params['username']) {
//                if ($this->repository->getByUsername($params['username'])) {
//                    return $this->responseWithMessage('User with that username already exists!', 400);
//                }
//                $entity->setUsername($params('username'));
//            }
//
//            if($params['email']) {
//                if ($this->repository->getByEmail($params['email'])) {
//                    return $this->responseWithMessage('User with that email already exists!', 400);
//                }
//                $entity->setEmail($params('email'));
//            }
//
//            if($params['password']) {
//                $entity->setPassword(
//                    $this->passwordEncoder->hashPassword(
//                        $entity, $params('password')
//                    )
//                );
//            }
//
//            if($params['role']) {
//                $entity->setRole($params('role'));
//
//            }
//
//            return $this->respond($this->repository->save($entity, true));
//        }

        return $this->responseWithMessage('Not exist entity under that ID!', 404);
    }
}
