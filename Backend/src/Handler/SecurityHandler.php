<?php

namespace App\Handler;

use App\Entity\User;
use App\Repository\UserRepository;
use FOS\ElasticaBundle\Manager\RepositoryManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityHandler extends BaseHandler
{
    protected $repository;
    private $passwordEncoder;
    private $JWTManager;

    public function __construct(UserRepository $repository, JWTTokenManagerInterface $JWTManager,
                                UserPasswordHasherInterface $passwordEncoder)
    {
        $this->repository = $repository;
        $this->passwordEncoder = $passwordEncoder;
        $this->JWTManager = $JWTManager;
    }

    public function login(Request $request)
    {
        $params = json_decode($request->getContent(), true);

        if (!isset($params['username']) || !isset($params['password'])) {
            return $this->parameterMissingResponse();
        }

        $user = $this->repository->getByUsername($params['username']);

        if ($user) {
            if (!$this->passwordEncoder->isPasswordValid($user, $params['password'])) {
                return $this->responseWithMessage('Incorrect password!', 403);
            }
            return self::getTokenUser($user);
        }

        return $this->responseWithMessage('Incorrect username!', 403);
    }

    public function getTokenUser(User $user): JsonResponse
    {
        $payload = array_merge(['id' => $user->getId()], ['name' => $user->getName()], ['surname' => $user->getSurname()], ['email' => $user->getEmail()], ['role' => $user->getRole()]);
        return new JsonResponse(['token' => $this->JWTManager->createFromPayload($user, $payload)]);
    }
}
